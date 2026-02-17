-- Fix Price Column Type
-- This script changes the price column from BigInt (Integer) to Decimal (Double Precision)
-- so that you can save prices like 12.99 without errors.

ALTER TABLE products 
ALTER COLUMN price TYPE DOUBLE PRECISION;

ALTER TABLE orders 
ALTER COLUMN total_price TYPE DOUBLE PRECISION;
