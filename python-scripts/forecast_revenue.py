import pandas as pd
from prophet import Prophet
import sys
import json
import concurrent.futures

# Hàm dự báo nhu cầu và tính doanh thu
def forecast_demand_for_product(product_df, product_id, price):
    model = Prophet()
    model.fit(product_df)
    
    future = model.make_future_dataframe(periods=90)  # Dự báo 90 ngày tới (3 tháng)
    forecast = model.predict(future)
    
    # Chuyển đổi Timestamp thành string
    forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d')
    
    # Tính doanh thu dự báo
    forecast['revenue'] = forecast['yhat'] * price
    
    # Nhóm theo tháng và tính tổng doanh thu mỗi tháng
    forecast['month'] = pd.to_datetime(forecast['ds']).dt.to_period('M')
    monthly_revenue = forecast.groupby('month')['revenue'].sum().reset_index()
    
    # Chuyển giá trị 'month' thành chuỗi trước khi trả về
    monthly_revenue['month'] = monthly_revenue['month'].astype(str)
    
    # Chuyển kết quả thành dictionary
    return monthly_revenue.to_dict(orient='records')

# Hàm chính
def main():
    temp_file_path = sys.argv[1]
    with open(temp_file_path, 'r', encoding='utf-8') as file:  # Thêm encoding để tránh lỗi mã hóa
        input_data = json.load(file)

    df = pd.DataFrame(input_data['data'])
    df = df.rename(columns={'date': 'ds', 'qty': 'y'})
    df['ds'] = pd.to_datetime(df['ds'], errors='coerce')  # Convert to datetime if not already, handle invalid date
    
    if df['ds'].dt.tz is not None:  # Check if timezone exists
        df['ds'] = df['ds'].dt.tz_localize(None)  # Remove timezone
        
    results = {}
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for product_id in df['productId'].unique():
            product_df = df[df['productId'] == product_id][['ds', 'y']]
            # Lấy giá sản phẩm từ dữ liệu
            price = df[df['productId'] == product_id]['price'].iloc[0]
            futures.append(executor.submit(forecast_demand_for_product, product_df, product_id, price))
        
        for idx, future in enumerate(concurrent.futures.as_completed(futures)):
            product_id = int(df['productId'].unique()[idx])
            results[product_id] = future.result()
    
    # In kết quả dưới dạng JSON
    print(json.dumps(results, ensure_ascii=False))

if __name__ == "__main__":
    main()
