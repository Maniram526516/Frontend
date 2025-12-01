import { useParams } from "react-router-dom";

function DealerDetailPage() {
  const { filename } = useParams();

  console.log("DealerDetailPage rendered for:", filename);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "red" }}>Dealer Details</h2>
      <p><strong>Filename:</strong> {filename}</p>
    </div>
  );
}

export default DealerDetailPage;
