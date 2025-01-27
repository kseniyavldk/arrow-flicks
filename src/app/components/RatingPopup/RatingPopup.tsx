import React, { useEffect, useState } from "react";
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
import { Movie } from "../../types";

interface RatingModalProps {
  opened: boolean;
  close: () => void;
  movie: Movie;
  setUserRating: React.Dispatch<React.SetStateAction<number | null>>;
  onUpdateRating: (rating: number) => void;
  onDelete?: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  opened,
  close,
  movie,
  setUserRating,
  onUpdateRating,
  onDelete,
}) => {
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (opened) {
      const storedRating = localStorage.getItem(`movie_${movie.id}_rating`);
      setRating(storedRating ? Number(storedRating) : 0);
    }
  }, [opened, movie.id]);

  const handleSubmit = () => {
    localStorage.setItem(`movie_${movie.id}_rating`, rating.toString());
    setUserRating(rating);
    onUpdateRating(rating);
    close();
  };

  const handleRemoveRating = () => {
    localStorage.removeItem(`movie_${movie.id}_rating`);
    setUserRating(null);
    onUpdateRating(0);
    if (onDelete) {
      onDelete();
    }
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
        <Rating value={rating} onChange={setRating} size="xl" count={10} />
      </Group>
      <Group>
        <Button miw="fit-content" bg="#9854F6" size="md" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="transparent"
          miw="fit-content"
          size="md"
          onClick={handleRemoveRating}
          color="#9854F6"
        >
          Remove rating
        </Button>
      </Group>
    </Modal>
  );
};

export default RatingModal;
