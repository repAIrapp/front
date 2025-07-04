import { Separator } from "@/components/ui/separator"

export function AuthSeparator() {
  return (
    <div className="relative my-6">
      <Separator />
      <div className="absolute inset-0 flex justify-center">
        <span className="bg-white px-4 text-sm text-gray-500">ou</span>
      </div>
    </div>
  )
}
