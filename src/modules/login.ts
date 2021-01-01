const loginDomain = {
  LOGIN_SELECTOR: '#btn-passport-login',
  LOGIN_PAGE: 'https://denham.hub.clubv1.com/',

  loginUser: async (page: any) => {
    console.log('Start LoginUser')
    try {
      await page.goto(loginDomain.LOGIN_PAGE)
      console.log('Got login page')
      const loginWindowPromise = new Promise((x) => page.once('popup', x))
      await page.click(loginDomain.LOGIN_SELECTOR)
      const loginWindow: any = await loginWindowPromise
      // @ts-ignore
      await loginWindow.click('#Username')
      await loginWindow.keyboard.type(process.env.EMAIL)
      await loginWindow.click('#Password')
      await loginWindow.keyboard.type(process.env.PASSWORD)
      // await loginWindow.click('#RememberMe')
      await loginWindow.click('#form0 > div:nth-child(8) > input')
      console.log('Completed User Login')
    } catch (loginError) {
      console.log('Failed to log in', loginError)
      throw loginError
    }
  }
}

export default loginDomain
