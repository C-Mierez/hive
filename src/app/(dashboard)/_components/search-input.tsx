"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import qs from "query-string";

export default function SearchInput() {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/files",
        query: {
          search: debouncedValue,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="relative h-fit w-full">
      <MagnifyingGlassIcon className="absolute ml-3 h-full w-4" />
      <Input
        className="w-full max-w-xl pl-8"
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
