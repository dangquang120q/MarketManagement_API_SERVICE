import sys
import json
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from multiprocessing import Pool, cpu_count

# Tính toán độ tương đồng giữa các sản phẩm
def calculate_similarity(purchase_matrix_chunk):
    product_similarity = cosine_similarity(purchase_matrix_chunk.T)
    product_similarity_df = pd.DataFrame(
        product_similarity,
        index=purchase_matrix_chunk.columns,
        columns=purchase_matrix_chunk.columns
    )
    return product_similarity_df

# Hàm chính để tính toán gợi ý
def get_recommendations(purchase_history):
    # Tạo bảng pivot matrix
    purchase_df = pd.DataFrame(purchase_history)
    purchase_matrix = purchase_df.pivot_table(
        index='memberId',
        columns='productId',
        values='qty',
        aggfunc='sum',
        fill_value=0
    )
    
    # Chia nhỏ ma trận sản phẩm thành các phần nhỏ để xử lý song song
    num_chunks = cpu_count()
    chunks = [purchase_matrix.iloc[:, i::num_chunks] for i in range(num_chunks)]
    
    # Xử lý song song các phần ma trận
    with Pool(processes=num_chunks) as pool:
        results = pool.map(calculate_similarity, chunks)
    
    # Kết hợp kết quả từ các phần
    product_similarity_df = pd.concat(results, axis=1).fillna(0)
    
    # Xây dựng gợi ý
    recommended_products = set()
    for product_id in purchase_matrix.columns:
        if product_id in product_similarity_df:
            similar_products = product_similarity_df[product_id].sort_values(ascending=False).iloc[1:11]
            recommended_products.update(similar_products.index.tolist())
    
    return list(recommended_products)

# Hàm chính
def main():
    # Đảm bảo đầu ra sử dụng UTF-8
    sys.stdout.reconfigure(encoding='utf-8')
    
    # Đọc dữ liệu đầu vào từ Node.js
    customer_data = json.loads(sys.argv[1])
    products = customer_data['products']
    purchase_history = customer_data['invoiceData']
    
    # Tạo danh sách sản phẩm
    product_list = {product['id']: product for product in products}
    purchase_data = [
        {
            'memberId': record['memberId'],
            'productId': record['productId'],
            'qty': record['qty']
        }
        for record in purchase_history
    ]
    
    # Lấy gợi ý sản phẩm
    recommended_product_ids = get_recommendations(purchase_data)
    
    # Lọc ra thông tin chi tiết của các sản phẩm gợi ý
    recommended_products = [
        product_list[product_id]
        for product_id in recommended_product_ids if product_id in product_list
    ]
    
    # Trả về danh sách đầy đủ thông tin sản phẩm
    print(json.dumps(recommended_products, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()
