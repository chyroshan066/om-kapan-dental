"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon } from "@phosphor-icons/react";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import type { GalleryImageRecord } from "@/types/gallery";

// Renders the real photo when it loads, otherwise falls back to a styled
// placeholder tile instead of a broken-image icon.
const GalleryTile = ({
    image,
    onClick,
}: {
    image: GalleryImageRecord;
    onClick: () => void;
}) => {
    const [failed, setFailed] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative block w-full aspect-[4/3] overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-400/20 hover:-translate-y-1"
        >
            {failed ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 bg-primary/5 text-primary/40">
                    <ImageIcon weight="light" className="w-10 h-10" />
                    <span className="text-xs font-bold text-primary/50">
                        Photo unavailable
                    </span>
                </div>
            ) : image.resource_type === "video" ? (
                <video
                    src={image.src}
                    muted
                    playsInline
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            ) : (
                <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            )}
            {/* Category chip, same badge style used on Doctors/Branches cards */}
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full">
                {image.category}
            </span>
        </button>
    );
};

export const GalleryGrid = ({ images }: { images: GalleryImageRecord[] }) => {
    const [activeCategory, setActiveCategory] = useState<
        "All" | (typeof GALLERY_CATEGORIES)[number]
    >("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredImages = useMemo(() => {
        if (activeCategory === "All") return images;
        return images.filter((img) => img.category === activeCategory);
    }, [activeCategory, images]);

    const activeImage =
        lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

    const showPrev = () =>
        setLightboxIndex((i) =>
            i === null ? null : (i - 1 + filteredImages.length) % filteredImages.length
        );
    const showNext = () =>
        setLightboxIndex((i) =>
            i === null ? null : (i + 1) % filteredImages.length
        );

    if (images.length === 0) {
        return (
            <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center">
                <p className="text-sm text-slate-800/60">
                    Photos coming soon — check back shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-10">
            {/* Category filter tabs */}
            <div
                className="flex flex-wrap justify-center"
                style={{ gap: "10px" }}
            >
                {(["All", ...GALLERY_CATEGORIES] as const).map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        style={{ padding: "10px 20px" }}
                        className={`rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                            activeCategory === cat
                                ? "bg-primary text-white"
                                : "bg-white text-slate-600 border border-gray-200 hover:border-primary hover:text-primary"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                    <GalleryTile
                        key={image.id}
                        image={image}
                        onClick={() => setLightboxIndex(index)}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                        <svg className="w-5 h-5">
                            <use href="#close-mark" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                        className="absolute left-4 sm:left-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        style={{ transform: "rotate(180deg)" }}
                    >
                        <svg className="w-6 h-6">
                            <use href="#arrow-right-circle" />
                        </svg>
                    </button>

                    <div
                        className="max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white/5">
                            {activeImage.resource_type === "video" ? (
                                <video
                                    src={activeImage.src}
                                    controls
                                    autoPlay
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <img
                                    src={activeImage.src}
                                    alt={activeImage.alt}
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.display =
                                            "none";
                                    }}
                                />
                            )}
                        </div>
                        <p className="mt-4 text-center text-white/80 text-sm font-medium">
                            {activeImage.alt}
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Next image"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        className="absolute right-4 sm:right-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                        <svg className="w-6 h-6">
                            <use href="#arrow-right-circle" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};