import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
