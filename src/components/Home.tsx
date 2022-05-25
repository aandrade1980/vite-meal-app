import { useState } from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Row,
  Spacer,
  Text
} from '@nextui-org/react';

import { Link } from 'react-router-dom';

import useMeals from '../hooks/useMeals';

export function Home() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const { data: meals, isFetching } = useMeals(searchValue);

  return (
    <Container xl as="main">
      <Grid.Container gap={2}>
        <Grid xs={12}>
          <Card>
            <Row justify="center" align="center" css={{ mb: 16 }}>
              <Text h1>Meal App</Text>
            </Row>
            <Row justify="center" align="center">
              <form>
                <Container display="flex">
                  <Input
                    aria-label="Search"
                    type="search"
                    placeholder="Search for meals"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                  <Spacer x={1} />
                  <Button onPress={() => setSearchValue(inputValue)}>
                    Search
                  </Button>
                </Container>
              </form>
            </Row>
          </Card>
        </Grid>

        {isFetching ? (
          <Container display="flex" justify="center" css={{ mt: 80 }}>
            <Loading size="xl" />
          </Container>
        ) : (
          meals?.map(meal => (
            <Grid key={meal.idMeal}>
              <Link to={`/${meal.idMeal}`}>
                <Card hoverable clickable>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      objectFit="cover"
                      src={meal.strMealThumb}
                      height={320}
                      width="100%"
                      alt={meal.strMeal}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Text b>
                      {meal.strMeal.length > 35
                        ? meal.strMeal.substring(0, 32) + '...'
                        : meal.strMeal}
                    </Text>
                  </Card.Footer>
                </Card>
              </Link>
            </Grid>
          ))
        )}
      </Grid.Container>
    </Container>
  );
}
