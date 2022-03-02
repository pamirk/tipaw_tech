import type {NextPage} from "next"
import * as React from "react"
import {useEffect} from "react"
import styled from '@emotion/styled'

import {redirectUser} from "../utils/auth"
import {parseCookies} from "nookies"
import {useRouter} from "next/router"
import {SignupForm} from "../components/Auth/SignupForm";


const Signup: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        document.title = "Beast Battles | Sign up"
    }, [])

    return (
        <Wrapper>
            <Container>
                <Title>S`inscrire</Title>
                <Caption>Rejoignez Tipaw aujourd`hui. C`est gratuit !</Caption>
                <div style={{marginBottom: '30px'}}>Vous êtes un refuge, un éleveur, un vétérinaire ou toiletteur ?
                    <Link href="/inscription-tipaw">Cliquez-ici</Link>
                </div>
                <ImageButton color='#707070'>
                    <button>
                        <Image src='https://tipaw.com/assets/google-icon-3SWGK4VN.svg'/>
                        Inscription avec Google
                    </button>
                </ImageButton>
                <ImageButton bgcolor='#3b5998' >
                    <button>
                        <Image src='https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico'/>
                        Inscription avec Facebook
                    </button>
                </ImageButton>

                <FormContainer>
                    <SignupForm/>
                </FormContainer>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  padding-top: 80px;
  background: rgb(90, 206, 232);
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;

  max-width: 100%;
  position: relative;

  @media (max-width: 800px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`
const Container = styled.div`
  z-index: 1;
  position: relative;
  border-radius: 15px;
  background: white;
  box-shadow: rgb(0 0 0 / 15%) 0 0 14px 0;
  padding: 30px;
  margin: auto;
  max-width: 100%;
  width: 540px;

  @media (max-width: 600px) {
    width: 100% !important;
  }
  @media (max-width: 800px) {
    width: 440px;
  }
  @media (max-width: 1000px) {
    width: 540px;
  }
  @media (max-width: 1280px) {
    width: 540px;
  }
`
const Title = styled.h2`
  font-family: "serif";
  color: rgb(90, 206, 232);
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 15px;

  @media (max-width: 800px) {
    font-size: 28px;
  }
  @media (max-width: 1280px) {
    font-size: 32px;
  }
`
const Caption = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
`
const FormContainer = styled.div`
  margin-top: 25px;
`
const Link = styled.a`
  color: rgb(90, 206, 232);
  font-weight: 700;
  margin-left: 12px;
`
const Image = styled.img`
  margin-right: 12px;
  width: 20px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ImageButton = styled.div`

  margin-bottom: 15px;
  vertical-align: top;
  width: calc(100% - 0px);
  display: block;
  @media (max-width: 1000px) {
    width: 100%;
  }

  button {
    border-radius: 15px;
    height: 40px;
    line-height: unset;
    padding: 0 24px;
    box-shadow: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color || 'white'};
    background-color: ${props => props.bgcolor || 'white'};
    border-color: ${props => props.bgcolor || '#707070'}  ;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0;
    cursor: pointer;
  }

`

Signup.getInitialProps = async (ctx) => {
    const {token} = parseCookies(ctx)
    if (token) redirectUser(ctx, "/")
    return {token}
}
export default Signup
