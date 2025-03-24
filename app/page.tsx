import {  AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";


export default async function Home() {

  const bikes = await prisma.bike.findMany()
  return (
    <div className="flex flex-col gap-4 py-32 max-w-4xl  m-auto ">
      <h1 className="text-center font-bold text-4xl bg-gradient-to-b from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
             Scraper  les 10 résultats les plus récents de Vélos Électriques sur LeBonCoin
      </h1>
      <ul className="flex flex-col space-y-4">
        {bikes.map(bike => (
          <li key={bike.id}>
            <Link href={bike.link}>
              <Card  >
                <CardHeader className="flex flex-row gap-4">
                  <div>
                    <Avatar>
                      
                      {bike.logo? (
                        <AvatarImage src={bike.logo} className="w-48" alt="image" />
                      ) : null
                      }
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <CardTitle>{bike.title}</CardTitle>
                    <CardDescription>{bike.price}</CardDescription>
                    <p>{bike.date ? bike.date.toLocaleDateString() : "Date non disponible"}</p>
                  </div>
                  
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
