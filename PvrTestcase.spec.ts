import test, { expect } from '@playwright/test'

test ("PVR Dynamic Booking", async({page})=>{
    await page.goto("https://www.pvrcinemas.com/")
    await page.locator("(//div[@class='cities-overlay cities-active'])[4]").click() //select bangalore location
    await page.locator(".cinemas-inactive").click()  //select cinema option
    await page.locator("#cinema").click() //click on Select cinema dropdown
    await page.locator("(//li[@class='p-dropdown-item'])[3]").click() //Select Garuda Mall, Magrath Road
    await page.waitForTimeout(2000)
    await page.locator("//span[text()='Tomorrow']").click() //Select date as Tomorrow
    await page.waitForTimeout(2000)
    await page.locator("(//span[text()='PARIMALA AND CO'])[2]").click() //Select movie name as Parimala And Co
    await page.locator("//span[text()='LASER']").click() //selecting Time
    await page.waitForTimeout(2000)
    await page.getByLabel("submit").click() //clicking on book button
    await page.waitForTimeout(2000)
    await page.locator("//button[@class='sc-kCuUfV iBvycX reject-terms']").click() //accept terms & conditions dialog
    await page.waitForTimeout(2000)
    await page.locator("//span[@id='PC.CLASSIC PLUS ROWS|H:18']").click() //selecting the H-18 seat
    await page.waitForTimeout(2000)
    
    const BookingDetails = page.locator("//div[@class='col-md-3 book-summary desktop-seat-bread']") //Booking Summary section
    const BookingContent = await BookingDetails.textContent() //Getting Booking summary content
    console.log(BookingContent)

    const SeatNumber = page.locator("//div[@class='seat-number']") //Selected seat is displaying under booking summary
    await expect(SeatNumber).toHaveText("H18")

    const GrandTotal = page.getByText("336.02") //checking the Grandtotal
    await expect(GrandTotal).toBeVisible()

})