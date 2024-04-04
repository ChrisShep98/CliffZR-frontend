const LOCAL_API_SERVER = "http://localhost:8080";

// export async function saveContact(contact: any) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     body: JSON.stringify(contact),
//   });
//   return response.json();
// }

export async function getUserBoulderingGrades(username: string) {
  const response = await fetch(`${LOCAL_API_SERVER}/users/${username}`);
  const data = await response.json();
  return data;
}
