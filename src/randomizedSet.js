export default class RandomizedSet {
  constructor() {
    this.nums = [];
    this.indexMap = new Map();
  }
  insert(val) {
    if (this.indexMap.has(val)) {
      return false;
    }
    this.nums.push(val);
    this.indexMap.set(val, this.nums.length - 1);
    return true;
  }
  remove(val) {
    if (!this.indexMap.has(val)) {
      return false;
    }
    const valIndex = this.indexMap.get(val);
    [this.nums[valIndex], this.nums[this.nums.length - 1]] = [
      this.nums[this.nums.length - 1],
      this.nums[valIndex],
    ];
    this.nums.pop();
    this.indexMap.set(this.nums[valIndex], valIndex);
    this.indexMap.delete(val);
    return true;
  }
  getRandom() {
    const randomindex = Math.floor(Math.random() * this.nums.length);
    const randomval = this.nums[randomindex];
    this.remove(randomval);

    return randomval;
  }
}
