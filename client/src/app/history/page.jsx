import Link from "next/link"

export default function Component() {

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-[#9d9d9d] p-4 text-white w-3/4">
      <h1 className="text-2xl  mb-6">History</h1>
      <div className="space-y-4">
        <div className="bg-[#262626] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Zoom Meeting at 2 with Microsoft</h2>
          <p className="text-sm my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex justify-between items-center text-xs">
            <span>2024-01-29 at 2:00 PM</span>
            <span variant="secondary">Completed</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">$20.36</span>
            <div className="flex space-x-2">
              <Link className="block" href="#">
                Location
              </Link>
              <Link className="block" href="#">
                Link
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#262626] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Zoom Meeting at 2 with Microsoft</h2>
          <p className="text-sm my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex justify-between items-center text-xs">
            <span>2024-01-29 at 2:00 PM</span>
            <span variant="secondary">Missed</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">$20.36</span>
            <div className="flex space-x-2">
              <Link className="block" href="#">
                Location
              </Link>
              <Link className="block" href="#">
                Link
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#262626] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Zoom Meeting at 2 with Microsoft</h2>
          <p className="text-sm my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex justify-between items-center text-xs">
            <span>2024-01-29 at 2:00 PM</span>
            <span variant="secondary">Missed</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">$20.36</span>
            <div className="flex space-x-2">
              <Link className="block" href="#">
                Location
              </Link>
              <Link className="block" href="#">
                Link
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#262626] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Zoom Meeting at 2 with Microsoft</h2>
          <p className="text-sm my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex justify-between items-center text-xs">
            <span>2024-01-29 at 2:00 PM</span>
            <span variant="secondary">Completed</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">$20.36</span>
            <div className="flex space-x-2">
              <Link className="block" href="#">
                Location
              </Link>
              <Link className="block" href="#">
                Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
