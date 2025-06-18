export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-red-500 text-left p-4 bg-red-100 border border-red-400 rounded">
      <p>Error: {message}</p>
    </div>
  );
}
