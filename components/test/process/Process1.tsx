import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";

import Button from "@/shared/buttons";
import { Scroll } from "@/shared/Styles";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const Process1 = ({ setStep }: Props) => {
  return (
    <Wrapper>
      <TextBoxWrapper>
        <TextBox className={Scroll.styles}>
          <Text>
            Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut.
            Carrot cake caramels pie sweet apple pie tiramisu carrot cake.
            Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon
            drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton
            candy gummi bears chocolate bar cake cookie. Cupcake muffin danish
            muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé
            chocolate cake pastry brownie. Oat cake halvah sweet roll cotton
            candy croissant lollipop. Macaroon tiramisu chocolate bar candy
            candy carrot cake jelly sweet. Gummies croissant macaroon dessert.
            Chocolate cake dragée pie.
          </Text>
          <Text>
            Next level tbh everyday carry, blog copper mug forage kitsch roof
            party pickled hammock kale chips tofu. Etsy shoreditch 8-bit
            microdosing, XOXO viral butcher banh mi humblebrag listicle woke
            bicycle rights brunch before they sold out ramps. Twee shabby chic
            taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips
            typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical
            banh mi narwhal echo park cronut.
          </Text>
          <Text>
            Zombie ipsum reversus ab viral inferno, nam rick grimes malum
            cerebro. De carne lumbering animata corpora quaeritis. Summus brains
            sit, morbo vel maleficia? De apocalypsi gorger omero undead survivor
            dictum mauris. Hi mindless mortuis soulless creaturas, imo evil
            stalking monstra adventus resi dentevil vultus comedat cerebella
            viventium. Qui animated corpse, cricket bat max brucks terribilem
            incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos
            comedere carnem virus. Zonbi tattered for solum oculi eorum
            defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut
            malus putrid voodoo horror. Nigh tofth eliv ingdead.
          </Text>
        </TextBox>
      </TextBoxWrapper>

      <SubText>약관에 동의 하신다면 아래의 버튼을 눌러주세요</SubText>

      <Button margin="auto 0px 0px 0px" onClick={() => setStep(1)}>
        동의하기
      </Button>
    </Wrapper>
  );
};

export default Process1;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
`;
const TextBoxWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: var(--box);
  & * {
    background-color: var(--box);
  }
`;
const TextBox = styled.div`
  ${Scroll};
  max-height: 300px;
  display: grid;
  gap: 16px;
`;
const Text = styled.p`
  font: var(--normal12);
  white-space: pre-wrap;
`;
const SubText = styled.p`
  font: var(--normal12);
  color: var(--sub);
`;
