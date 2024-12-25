export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { id } = params;
  return <div>{id}</div>;
}
