-- Insert sample products
INSERT INTO products (id, name, description, active, metadata)
VALUES
  ('prod_basic', 'Basic', 'For individuals and small projects', true, '{"features": ["5 Projects", "10GB Storage", "Basic Support", "1 User"]}'),
  ('prod_pro', 'Pro', 'For professionals and growing teams', true, '{"features": ["Unlimited Projects", "100GB Storage", "Priority Support", "5 Users", "Advanced Analytics"]}'),
  ('prod_enterprise', 'Enterprise', 'For large organizations with advanced needs', true, '{"features": ["Unlimited Projects", "1TB Storage", "24/7 Support", "Unlimited Users", "Advanced Analytics", "Custom Integrations", "Dedicated Account Manager"]}');

-- Insert sample prices
INSERT INTO prices (id, product_id, active, description, unit_amount, currency, type, interval, interval_count)
VALUES
  ('price_basic_monthly', 'prod_basic', true, 'Basic Plan Monthly', 999, 'usd', 'recurring', 'month', 1),
  ('price_basic_yearly', 'prod_basic', true, 'Basic Plan Yearly', 9990, 'usd', 'recurring', 'year', 1),
  ('price_pro_monthly', 'prod_pro', true, 'Pro Plan Monthly', 1999, 'usd', 'recurring', 'month', 1),
  ('price_pro_yearly', 'prod_pro', true, 'Pro Plan Yearly', 19990, 'usd', 'recurring', 'year', 1),
  ('price_enterprise_monthly', 'prod_enterprise', true, 'Enterprise Plan Monthly', 4999, 'usd', 'recurring', 'month', 1),
  ('price_enterprise_yearly', 'prod_enterprise', true, 'Enterprise Plan Yearly', 49990, 'usd', 'recurring', 'year', 1);

-- Create admin user (you'll need to replace with actual UUID after creating the user)
-- INSERT INTO profiles (id, full_name, role)
-- VALUES ('00000000-0000-0000-0000-000000000000', 'Admin User', 'admin');
