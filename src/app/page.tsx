"use client";

import React from "react";
import { Button } from "@/features/common/components/atoms/button";
import { Text } from "@/features/common/components/atoms/Text";
import { Input } from "@/features/common/components/atoms/input";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline">Testing</Button>
      <Text variant="primary">Testing</Text>
      <Input label="Testing" />
    </div>
  );
}
