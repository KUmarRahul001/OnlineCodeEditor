-- Insert sample pending user
INSERT INTO `pending_users` (`id`, `email`, `phone`, `password`, `otp`, `created_at`) VALUES
(1, 'kumarrahulraj468@gmail.com', '+918434237052', '$2y$10$Wj1dNQBjWxXs0R4rW/P7X.Z5fr7yG.4HclRjD6wsVIc/DGLO5dxvO', 726063, '2025-06-19 14:28:39');

-- Insert sample verified user
INSERT INTO `users` (`id`, `email`, `phone`, `password`, `verification_code`, `is_verified`, `reset_token`, `reset_expires`) VALUES
(1, 'kumarrahulraj468@gmail.com', '', '$2y$10$YieGHisYkMx0OACzAKhSt.efcVMCvankypla.HoUJmWpFCir92XHi', NULL, 0, NULL, NULL);
