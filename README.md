# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Build guide
- should build on linux

1. npm run dev
- lúc này sẽ tạo ra 2 cert, copy file cert.pem ra máy windows, sau đó import cert này vào trình duyệt

-> mục tiêu: https://localhost nhưng không bị alert cert không hợp lệ

2. npm run build
3. npm run preview

## features
- tự detect khi nào có mạng hoặc không có mạng
- đẩy push notification thường xuyên (only browser pc)
