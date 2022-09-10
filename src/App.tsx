import Calendar from "components/Calendar";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback="Carregando...">
        <Calendar />
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
