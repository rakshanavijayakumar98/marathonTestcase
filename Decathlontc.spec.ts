import test, { expect } from '@playwright/test'

test("Decathlon: Add to cart", async({page}) =>{
    await page.goto("https://www.decathlon.in/")
    const HomePage = page.getByAltText("NC Banner new CBF mWeb").first()
    await expect(HomePage).toBeVisible() //Check user navigated to HomePage
    console.log("User navigated to HomePage")
   
    const SearchEnable = page.locator("//input[contains(@placeholder,'Search')]") //Placeholder is dynamic, so used partial based
    await SearchEnable.click() //enabling search field
    await expect(SearchEnable).toBeEnabled()
    console.log("Search field is enabled")

    await SearchEnable.fill("Shoes")
    await page.keyboard.press('Enter') //pressing enter from keyboard
    await page.waitForTimeout(2000)

    const PageTitle = await page.title()
    console.log("Page title is "+ PageTitle)
    await page.waitForTimeout(2000)

    await page.locator("//span[text()='Category']").click() //Click on catagory
    await page.waitForTimeout(2000)

    await page.locator("//span[text()='Football boots']").click() //selecting Football boots
    await page.waitForTimeout(2000)

    await page.locator("//span[text()='Gender']").click() //click on gender
    await page.locator("//span[@class='-mt-1.5 flex-1 text-left text-sm text-rock-900']").first().click() //selecting men
    await page.waitForTimeout(2000)

    await page.locator("//span[text()='Size']").click() //click on size
    await page.locator("//span[text()= '7']").first().click() //Selecting size 8
    await page.waitForTimeout(2000)

    await page.locator("//span[text()='Most relevant']").click() //selecting Sorting option
    await page.locator("//span[text()= 'Price (high → low) ']").click() //High to low sort option
    await page.waitForTimeout(2000)

    await page.getByAltText("Adidas PREDATOR ACCURACY.3 IN Unisex Football Shoes White").first().click() //selecting first product
    await page.waitForTimeout(4000)

    await page.locator("(//span[@class='text-sm font-medium text-rock-900 svelte-1e28kos'])[2]").click() //selecting size

    await page.locator("//span[text()='Add to cart']").click() //click on Add to cart

    const ToastMessage= page.locator("//h3[@class='text-[16px]']") //Fetching Toast message locator
    await expect(ToastMessage).toHaveText("Product(s) added to cart")

    const ToastContent = await ToastMessage.textContent() //Getting and printing toast message content
    console.log(ToastContent)

    await page.getByLabel('Cart').click() //clicking on cart icon
    await page.waitForTimeout(2000)
    //fetching cart details
    const Product_Details= await page.locator("//div[@class='ml-4 md:ml-8 flex-1 min-w-0 flex flex-col gap-2 md:gap-5']").textContent()
    console.log("Product details is: "+ Product_Details)

    const ProductAmount = page.locator("(//div[@class='flex gap-1'])[2]")
    await expect(ProductAmount).toHaveText('₹7,999')

    const CartAmount = await ProductAmount.textContent() //Cart total amount
    console.log("The cart amount is: "+ProductAmount) 

})