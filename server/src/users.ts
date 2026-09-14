export type User = {
  id: string;
  email: string;
  passwordHash: string;
};

const users: User[] = [];

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function createUser(user: User): void {
  users.push(user);
}
