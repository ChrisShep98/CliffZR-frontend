const API_URL = "http://localhost:8080/contacts";

export async function saveContact(contact: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(contact),
  });
  return response.json();
}

export async function getUserBoulderingGrades(username: string) {
  const response = await fetch(`http://localhost:8080/users/${username}`);
  const data = await response.json();
  return data;
}
