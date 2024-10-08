import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barberShopItem"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/bookingItem"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/getConfirmedBookings"

const Home = async () => {
    const session = await getServerSession(authOptions)
    // Chamar banco de dados
    const barbershops = await db.barbershop.findMany({})
    const pupularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    const confirmedBookings = await getConfirmedBookings()

    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">
                    Olá, {session?.user ? session.user.name : "bem vindo"}!
                </h2>
                <p>
                    <span className="capitalize">
                        {format(new Date(), "EEEE, dd", { locale: ptBR })}
                    </span>
                    <span>&nbsp;de&nbsp;</span>
                    <span className="capitalize">
                        {format(new Date(), "MMMM", { locale: ptBR })}
                    </span>
                </p>

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
                            asChild
                        >
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image
                                    src={option.imageUrl}
                                    width={16}
                                    height={16}
                                    alt={option.imageUrl}
                                />
                                {option.title}
                            </Link>
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

                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                            Agendamentos
                        </h2>

                        {/* Agendamento */}
                        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                            {confirmedBookings.map((booking) => (
                                <BookingItem
                                    key={booking.id}
                                    booking={JSON.parse(
                                        JSON.stringify(booking),
                                    )}
                                />
                            ))}
                        </div>
                    </>
                )}

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
