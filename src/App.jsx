import SpecularButton from "./components/SpecularButton/SpecularButton"
import MagicBento from "./components/MagicBento/MagicBento"

export default function App({name}) {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center justify-center bg-black p-6">
      <h1 className="text-3xl font-bold text-white text-center">
       Assalamualikum {name}! Welcome to Job Finder Dashboard
      </h1>
      <div className="flex gap-4">
        <SpecularButton>
          Login
        </SpecularButton>
        <SpecularButton>
          Sign Up
        </SpecularButton>
      </div>
      <div className="w-full flex justify-center">
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt
          enableMagnetism
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </div>
  )
}
