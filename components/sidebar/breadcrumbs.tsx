'use client'

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { House } from "lucide-react";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname === "/" ? [] : pathname.split("/");

    function composeURL(segments: string[], index: number) {
        const url = segments.slice(0, index + 1).join("/");
        return index > 0 ? url : "/";        
    }
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.length > 0 && segments.map((segment, index) => (<>
                    <BreadcrumbItem key={index}>
                        {index < segments.length - 1 ? 
                            <BreadcrumbLink href={`${composeURL(segments, index)}`}>{index === 0 ? <House className="size-4" /> : segment}</BreadcrumbLink> :
                            <BreadcrumbPage>{index === 0 ? <House className="size-4" /> : segment}</BreadcrumbPage>
                        }
                    </BreadcrumbItem>
                    {index < segments.length - 1  && <BreadcrumbSeparator key={`${index}-separator`} />}
                </>))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}