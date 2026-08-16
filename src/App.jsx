import SpecularButton from "./components/SpecularButton/SpecularButton"

export default function App({name}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* <h1 className="text-3xl font-bold text-red-600"> */}
      {/* Hello {name}! Tailwind is Working! */}
        <SpecularButton>
          Login
        </SpecularButton>
    </div>
  )
}
