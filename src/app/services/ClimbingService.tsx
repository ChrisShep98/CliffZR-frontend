const API_URL = "http://localhost:8080/contacts";

export async function saveContact(contact: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(contact),
  });
  return response.json();
}

export async function getContacts() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
