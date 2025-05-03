// 'use client'
import { BellRing, Check } from "lucide-react"
import {Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/ui";
import {cn} from "@/shared/lib/utils";
import {Role} from "@/shared/generated/prisma";


// const notifications = [
//     {
//         title: "Your call has been confirmed.",
//         description: "1 hour ago",
//     },
//     {
//         title: "You have a new message!",
//         description: "1 hour ago",
//     },
//     {
//         title: "Your subscription is expiring soon!",
//         description: "2 hours ago",
//     },
// ]

// type CardProps = React.ComponentProps<typeof Card>

export interface UserData {
    id: string
    firstname: string
    lastname: string | null
    imageUrl: string | null
    email: string
    password: string
    role: Role
    createdAt: Date
}

export interface UserCardProps {
    userdata: UserData
    className?: string
    children?: React.ReactNode
}

export function UserCard({ className, userdata, ...props }: UserCardProps) {
    return (
        <Card
            // onClick={() => console.log(userdata.password)}
              className={cn("w-[380px] cursor-pointer", className)} {...props}>
            <CardHeader>
                <CardTitle>{userdata.firstname} {userdata.lastname}</CardTitle>
                <CardDescription>{userdata.email} {userdata.role}</CardDescription>
            </CardHeader>
            {/*<CardContent className="grid gap-4">*/}
            {/*    <div className=" flex items-center space-x-4 rounded-md border p-4">*/}
            {/*        /!*<BellRing />*!/*/}
            {/*        <div className="flex-1 space-y-1">*/}
            {/*            <p className="text-sm font-medium leading-none">*/}
            {/*                Push Notifications*/}
            {/*            </p>*/}
            {/*            <p className="text-sm text-muted-foreground">*/}
            {/*                Send notifications to device.*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
                {/*<div>*/}
                {/*    {notifications.map((notification, index) => (*/}
                {/*        <div*/}
                {/*            key={index}*/}
                {/*            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"*/}
                {/*        >*/}
                {/*            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />*/}
                {/*            <div className="space-y-1">*/}
                {/*                <p className="text-sm font-medium leading-none">*/}
                {/*                    {notification.title}*/}
                {/*                </p>*/}
                {/*                <p className="text-sm text-muted-foreground">*/}
                {/*                    {notification.description}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            {/*</CardContent>*/}
            {/*<CardFooter>*/}
            {/*    <Button className="w-full">*/}
            {/*        <Check /> Mark all as read*/}
            {/*    </Button>*/}
            {/*</CardFooter>*/}
        </Card>
    )
}
