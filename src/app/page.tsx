import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barberShopItem"

const Home = async () => {
    // Chamar banco de dados
    const barbershops = await db.barbershop.findMany({})
    const pupularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })
    // console.log({ barbershops });

    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">Olá, Lucas!</h2>
                <p>Segunda-feira, 05 de agosto.</p>

                {/* Busca */}
                <div className="mt-6 flex place-items-center gap-2">
                    <Input placeholder="Faça sua busca..." />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>

                {/* Busca rápida */}
                <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    <Button className="gap-2" variant="secondary">
                        <Image
                            src="/cabelo.svg"
                            width={16}
                            height={16}
                            alt={"Cabelo"}
                        />
                        Cabelo
                    </Button>
                    <Button className="gap-2" variant="secondary">
                        <Image
                            src="/barba.svg"
                            width={16}
                            height={16}
                            alt={"Barba"}
                        />
                        Barba
                    </Button>
                    <Button className="gap-2" variant="secondary">
                        <Image
                            src="/cabelo.svg"
                            width={16}
                            height={16}
                            alt={"Cabelo"}
                        />
                        Acabamento
                    </Button>
                    <Button className="gap-2" variant="secondary">
                        <FootprintsIcon size={16} />
                        Pézinho
                    </Button>
                    <Button className="gap-2" variant="secondary">
                        <EyeIcon size={16} />
                        Sobrancelha
                    </Button>
                </div>

                {/* Imagem */}
                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        className="rounded-xl object-cover"
                        alt="Agende nos melhores com   "
                        src="/banner-01.svg"
                        fill
                    />
                </div>

                {/* Agendamento */}
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Agendamentos
                </h2>
                <Card>
                    <CardContent className="flex justify-between p-0">
                        {/* Esquerda */}
                        <div className="flex flex-col gap-2 py-5 pl-5">
                            <Badge className="w-fit">Confirmado</Badge>
                            <h3 className="font-semibold">Corte de Cabelo</h3>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
                                </Avatar>
                                <p className="text-sm">Barbearia FSW</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                            <p className="text-sm">Agosto</p>
                            <p className="text-2xl">05</p>
                            <p className="text-sm">20:00</p>
                        </div>
                    </CardContent>
                </Card>

                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Recomendados
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => (
                        <BarberShopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>

                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Populares
                </h2>

                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {pupularBarbershops.map((barbershop) => (
                        <BarberShopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>

            <footer>
                <Card>
                    <CardContent className="px-5 py-6">
                        <p className="text-sm text-gray-400">
                            © 2023 Copyright{" "}
                            <span className="font-bold">FSW Barber</span>{" "}
                        </p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    )
}

export default Home
