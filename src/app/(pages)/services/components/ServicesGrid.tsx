"use client";

import { useState } from "react";
import { SERVICES } from "@/constants";

export const ServicesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isHovering = hoveredIndex !== null;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5 child:transition-all child-hover:shadow-2xl child-hover:shadow-slate-400/20 child-hover:border-gray-100 child:cursor-pointer">
      {SERVICES.map((service, index) => (
        // Service Item
        <div
          key={index}
          className="services-item rounded-[32px] border p-4 flex flex-col gap-y-4"
          style={{
            opacity: isHovering ? (hoveredIndex === index ? 1 : 0.5) : 1,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            className="w-full rounded-[32px]"
            src={service.img}
            alt={service.name}
          />
          <div className="text-center space-y-2">
            <h3 className="text-slate-800 font-bold">{service.name}</h3>
            <p className="text-[15px] font-medium text-slate-800/50">
              {service.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};