import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barberShopItem"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/bookingItem"
import Search from "./_components/search"

const Home = async () => {
    // Chamar banco de dados
    const barbershops = await db.barbershop.findMany({})
    const pupularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">Olá, Lucas!</h2>
                <p>Segunda-feira, 05 de agosto.</p>

                {/* Busca */}
                <div className="mt-6">
                    <Search />
                </div>

                {/* Busca rápida */}
                <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button
                            key={option.title}
                            className="gap-2"
                            variant="secondary"
                        >
                            <Image
                                src={option.imageUrl}
                                width={16}
                                height={16}
                                alt={option.imageUrl}
                            />
                            {option.title}
                        </Button>
                    ))}
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
                <BookingItem />

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
        </div>
    )
}

export default Home
