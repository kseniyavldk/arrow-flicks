import React, { useState } from "react";
import {
  Modal,
  Text,
  Divider,
  Group,
  Button,
  Rating,
  ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Movie } from "../types";

interface RatingModalProps {
  opened: boolean;
  close: () => void;
  movie: Movie;
}

const RatingModal: React.FC<RatingModalProps> = ({ opened, close, movie }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    console.log("User rating:", rating);
    close();
  };

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered>
      <Group justify="space-between">
        <Text size="md" lh="xs">
          Your rating
        </Text>
        <ActionIcon variant="subtle" color="#ACADB9" onClick={close} size="lg">
          <IconX size={20} />
        </ActionIcon>
      </Group>

      <Divider bg="#D5D6DC" my="md" />

      <Text size="lg" mb="md" fw={700}>
        {movie.title}
      </Text>

      <Group mb="xl" variant="default">
        <Rating defaultValue={2} size="xl" count={8} />
      </Group>
      <Group>
        <Button miw="fit-content" bg="#9854F6" size="md" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="transparent"
          miw="fit-content"
          size="md"
          onClick={handleSubmit}
          color="#9854F6"
        >
          Remove rating
        </Button>
      </Group>
    </Modal>
  );
};

export default RatingModal;
