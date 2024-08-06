import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const Home = async () => {
    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">Olá, Lucas!</h2>
                <p>Segunda-feira, 05 de agosto.</p>

                <div className="mt-6 flex place-items-center gap-2">
                    <Input placeholder="Faça sua busca..." />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>
            </div>
            <div className="relative mt-6 h-[150px] w-full">
                <Image
                    className="rounded-xl object-cover"
                    alt="Agende nos melhores com FSW Barber"
                    src="/banner-01.png"
                    fill
                />
            </div>
        </div>
    )
}

export default Home
