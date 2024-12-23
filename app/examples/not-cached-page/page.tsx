export const revalidate = 0;
export default function Page() {
  return (
    <div>
      <h1>Welcome to the Network App</h1>
      <p>This page is not cached.</p>
      <p>{new Date().toLocaleTimeString()}</p>
    </div>
  );
}
