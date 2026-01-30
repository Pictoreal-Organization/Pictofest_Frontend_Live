import Link from "next/link";
import Image from "next/image";

const ProfilePageCard = ({ route, image, title, styles = "" }) => {
  return (
    <Link
      href={route}
      className={`
        group
        relative
        w-full
        h-24 md:h-40
        rounded-2xl
        overflow-hidden
        cursor-pointer
        transition-all
        duration-300
        ease-out
        hover:-translate-y-[1px]
        ${styles}
      `}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="
          object-contain
          transition-transform transition-opacity
          duration-300
          ease-out
          group-hover:scale-[1.02]
          group-hover:opacity-95
        "
      />

      {/* Very light overlay */}
      <div
        className="
          absolute inset-0
          bg-black/5
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center ml-[2vw] -mr-[1vw]">
        <h2
          className="
            heading-font
            text-white
            text-xl md:text-4xl
            tracking-wide
            opacity-90
            translate-x-1
            transition-all
            duration-300
            ease-out
            group-hover:opacity-100
            group-hover:translate-x-0
          "
        >
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default ProfilePageCard;
