import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Loading,
  Text
} from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';

import { IoMdArrowBack } from 'react-icons/io';

import useMeal from '../hooks/useMeal';

export function Meal() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: meal, isFetching } = useMeal(params.id);

  const handleOnBack = () => navigate('/');

  if (isFetching) {
    return (
      <Container
        display="flex"
        justify="center"
        alignItems="center"
        css={{ height: '100vh' }}
      >
        <Loading size="xl" />;
      </Container>
    );
  }

  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <Button
          light
          color="primary"
          auto
          icon={<IoMdArrowBack fill="currentColor" />}
          onPress={handleOnBack}
        >
          Back
        </Button>
      </Grid>
      <Grid xs={12} md={8}>
        <Card>
          <Card.Header>
            <Text h3>{meal?.strMeal}</Text>
          </Card.Header>
          <Image
            width={450}
            height={450}
            src={meal?.strMealThumb as string}
            alt={meal?.strMeal as string}
            objectFit="cover"
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
}
