import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react"
import axios from "axios";
import Link from "next/link";

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
    if (!store) return null;
    const { data } = await axios.get<Location>(`${API_URL}/locations/${store}`, {
        headers: {
            ...authHeaders
        }
    })
    return (
        <Card>
            <CardHeader>
                <b className="w-full text-2xl">{data.locationName}</b>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col w-full items-center">
                <p className="w-full">
                    Manager: {" "}
                    <Link href={{ pathname: `/dashboard/managers` }}>
                        <b>{data.manager?.managerFullName}</b> 
                    </Link> 
                </p>
                <p className="w-full">
                    Dirección: <b>{data.locationAddress}</b>
                </p>
                <iframe
                    className="border-2 border-orange-800 rounded-md my-2"
                    width="300"
                    height="200"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyADRABQapXd2e7vXOs36bUFER4-XA2gJbQ
                        &q=${data.locationLatLng[0]},${data.locationLatLng[1]}`}>
                </iframe>
            </CardBody>
        </Card>
    )
}