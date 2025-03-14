import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { TypeORMDataSource } from '..';

async function create() {
  const connection = await TypeORMDataSource.initialize();

  const password = await hash('1234', 10);

  await connection.query(`
    INSERT INTO users (id, name, email, password, role, created_at, updated_at) 
    VALUES 
      ('${uuidv4()}', 'John Doe', 'user@tech.com', '${password}', 'user', NOW(), NOW()),
      ('${uuidv4()}', 'Jane Smith', 'manager@tech.com', '${password}', 'manager', NOW(), NOW()),
      ('${uuidv4()}', 'Mike Johnson', 'admin@tech.com', '${password}', 'admin', NOW(), NOW())
  `);

  await connection.destroy();
}

void create().then(() => console.log('Users created!'));
