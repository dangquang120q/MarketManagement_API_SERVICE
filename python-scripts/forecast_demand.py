import pandas as pd
from prophet import Prophet
import sys
import json
import concurrent.futures

# Hàm dự báo nhu cầu và tính doanh thu
def forecast_demand_for_product(product_df, product_id, price):
    model = Prophet()
    model.fit(product_df)
    
    future = model.make_future_dataframe(periods=7)  # Dự báo 7 ngày tới
    forecast = model.predict(future)
    
    # Chuyển đổi Timestamp thành string
    forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d %H:%M:%S')
    
    # Tính doanh thu dự báo
    forecast['revenue'] = forecast['yhat'] * price
    
    return forecast[['ds', 'yhat', 'revenue']].tail(7).to_dict(orient='records')

# Hàm chính
def main():
    temp_file_path = sys.argv[1]
    with open(temp_file_path, 'r', encoding='utf-8') as file:  # Thêm encoding để tránh lỗi mã hóa
        input_data = json.load(file)

    df = pd.DataFrame(input_data['data'])
    df = df.rename(columns={'date': 'ds', 'qty': 'y'})
    df['ds'] = pd.to_datetime(df['ds'])  # Convert to datetime if not already
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
    
    print(json.dumps(results, ensure_ascii=False))

if __name__ == "__main__":
    main()
