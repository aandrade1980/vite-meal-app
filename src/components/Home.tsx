/** Hooks */
import { lazy, useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { useMeals } from '../hooks';

/** Components */
import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  theme
} from '@nextui-org/react';

/** Lottie */
import { Player } from '@lottiefiles/react-lottie-player';

import confetti from 'canvas-confetti';

/** Dynamic */
const MealCardComponent = lazy(() =>
  import('./MealCard').then(module => ({ default: module.MealCard }))
);

export function Home() {
  const [searchParam, setSearchParam] = useLocalStorage('searchParam', '');
  const [inputValue, setInputValue] = useState(searchParam);
  const [searchValue, setSearchValue] = useState(searchParam);

  const { data: meals, isFetching } = useMeals(searchValue);

  const { zIndices } = theme;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchValue(inputValue);
    setSearchParam(inputValue);

    confetti({
      particleCount: 150,
      zIndex: +zIndices.max.value,
      origin: {
        x: 0.57,
        y: 0.3
      }
    });
  };

  useEffect(() => {
    if (!isFetching && meals) {
      confetti({
        particleCount: 150,
        zIndex: +zIndices.max.value,
        origin: {
          x: 0.57,
          y: 0.3
        }
      });
    }
  }, [isFetching, meals]);

  // TODO: No results message - screen?

  return (
    <Container xl as="main" display="flex" justify="center">
      <Grid.Container gap={2}>
        <Grid xs={12} css={{ mb: 16 }}>
          <Card>
            <Row justify="center" align="center">
              <Text h1>Meal App</Text>
            </Row>
            <Row justify="center" css={{ mb: 24 }}>
              <Player
                // TODO: Move to env file or config file
                src="https://assets1.lottiefiles.com/packages/lf20_kplouxqz.json"
                loop
                autoplay
                style={{ height: 80, width: 80 }}
              />
            </Row>
            <Row justify="center" align="center" css={{ mb: 16 }}>
              <form onSubmit={handleSearch}>
                <Container display="flex">
                  <Input
                    aria-label="Search"
                    type="search"
                    placeholder="Search for meals"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                  <Spacer x={1} />
                  <Button type="submit" shadow>
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
          <Grid.Container
            gap={3}
            css={{
              pt: 0,
              height: 'calc(100vh - 350px)',
              overflowX: 'auto'
            }}
          >
            {meals?.map(meal => (
              <MealCardComponent
                key={meal.idMeal}
                idMeal={meal.idMeal}
                strMealThumb={meal.strMealThumb}
                strMeal={meal.strMeal}
              />
            ))}
          </Grid.Container>
        )}
      </Grid.Container>
    </Container>
  );
}
