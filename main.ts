import { createClient } from './db';

async function main() {
  const db = await createClient();

  try {
    // invalid email
    await db.user.create({
      data: { email: 'abc@xyz', age: 20, role: 'USER' }
    })
  } catch (err) {
    console.log('Got expected error:', (err as Error).message);
  }

  try {
    // admin is not an adult, plus not having a zenstack email
    await db.user.create({
      data: { email: 'john@gmail.com', age: 16, role: 'ADMIN' }
    });
  } catch (err) {
    console.log('Got expected error:', (err as Error).message);
  }

  // success
  const user = await db.user.create({
    data: { email: 'john@zenstack.dev', age: 20, role: 'ADMIN' }
  });
  console.log('User create:', user);
}

main();
