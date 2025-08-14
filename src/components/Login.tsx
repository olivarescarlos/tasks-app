import CustomButton from "./CustomButton";

export default function Login({ onCancel }: { onCancel?: () => void }) {
  function handleLogin() {}
  function handleCancel() {
    onCancel?.()
  }
  return (
    <div className="bg-vibe-green hover:bg-vibe-green-shade p-2 m-2 rounded-md">
      <span className="font-semibold">Log In</span>
      <div className="flex justify-between">
        <label className="m-2 p-2 font-semibold" htmlFor="userName">
          User Name:
        </label>
        <input
          type="text"
          name="userName"
          className="bg-white rounded-md m-2 p-2"
        />
      </div>
      <div className="flex justify-between">
        <label className="m-2 p-2 font-semibold" htmlFor="password">
          Password:
        </label>
        <input
          type="text"
          name="password"
          className="bg-white rounded-md m-2 p-2"
        />
      </div>
      <div className="m-2">OR</div>
      <div className="border-2 border-black rounded-md m-2"></div>
      <div className="m-2">{"(Sign up with google goes here.)"}</div>
      <div className="flex justify-around">
        <CustomButton onClick={handleCancel} tooltip="cancel" label="Cancel" />
        <CustomButton onClick={handleLogin} tooltip="Log In" label="Log In" tooltipPosition="bottom"/>
      </div>
    </div>
  );
}
