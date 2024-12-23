export const revalidate = 5;
//seconds
export default function Page() {
  return (
    <div>
      <h1>Welcome to the Network App</h1>
      <p>This page is not cached.</p>
      <p>{new Date().toLocaleTimeString()}</p>
    </div>
  );
}
