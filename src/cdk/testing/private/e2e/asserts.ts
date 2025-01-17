/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {browser} from 'protractor';
import {getElement, FinderResult, waitForElement, Point} from './query';

/**
 * Asserts that an element exists.
 */
export async function expectToExist(selector: string, expected = true) {
  await waitForElement(selector).then((isPresent: boolean) => {
    expect(isPresent).toBe(expected, `Expected "${selector}"${expected ? '' : ' not'} to exist`);
  });
}

/**
 * Asserts that an element is focused.
 */
export async function expectFocusOn(element: FinderResult, expected = true) {
  expect(await browser.driver.switchTo().activeElement().getId()).toBe(
    await getElement(element).getId(), `Expected element${expected ? '' : ' not'} to be focused.`);
}

/**
 * Asserts that an element has a certain location.
 */
export async function expectLocation(element: FinderResult, {x, y}: Point) {
  await getElement(element).getLocation().then((location: Point) => {
    expect(Math.round(location.x)).toEqual(Math.round(x));
    expect(Math.round(location.y)).toEqual(Math.round(y));
  });
}

/**
 * Asserts that one element is aligned with another.
 */
export async function expectAlignedWith(element: FinderResult, otherElement: FinderResult) {
  await getElement(otherElement).getLocation().then(async (location: Point) => {
    await expectLocation(getElement(element), location);
  });
}
