import "./App.css";
import { usePrivy } from "@privy-io/react-auth";

function App() {
  const { ready, authenticated, user, login, logout, sendTransaction } =
    usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  // Replace this with the UnsignedTransactionRequest you'd like your user to send
  const unsignedTx = {
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: 122,
    value: "0x3B9ACA00",
  };

  // Replace this with the text you'd like on your transaction modal
  const uiConfig = {
    header: "Sample header text",
    description: "Sample description text",
    buttonText: "Sample button text",
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
        {ready && authenticated ? (
          <>
            <div>
              <textarea
                readOnly
                value={JSON.stringify(user, null, 2)}
                style={{ width: "600px", height: "250px", borderRadius: "6px" }}
              />
              <br />
              <button
                onClick={logout}
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "#069478",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Log Out
              </button>
            </div>
            <div>
              {/* <textarea
                readOnly
                value={JSON.stringify(user, null, 2)}
                style={{ width: "600px", height: "250px", borderRadius: "6px" }}
              />
              <br /> */}
              <button
                // onClick={logout}
                disabled={!user.wallet}
                onClick={async () => {
                  const txReceipt = await sendTransaction(unsignedTx, uiConfig);
                }}
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "#069478",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Send transaction
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={login}
            style={{
              padding: "12px",
              backgroundColor: "#069478",
              color: "#FFF",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Log In
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
