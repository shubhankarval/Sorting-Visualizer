def bubbleSort(nums):
    end = len(nums)
    for _ in range(len(nums) - 1):
        swapped = False
        for i in range(1, end):
            if nums[i-1] > nums[i]:
                swapped = True
                nums[i-1], nums[i] = nums[i], nums[i-1]
        if not swapped:
            return nums
        end -= 1
    return nums


def insertionSort(nums):
    for i in range(1, len(nums)):
        for j in range(i, 0, -1):
            if nums[j-1] > nums[j]:
                nums[j-1], nums[j] = nums[j], nums[j-1]
            else:
                break
    return nums


def selectionSort(nums):
    for i in range(len(nums) - 1):
        minIdx = i # index of the smallest number
        for j in range(i + 1, len(nums)):
            if nums[j] < nums[minIdx]:
                minIdx = j
        if minIdx != i:
            nums[i], nums[minIdx] = nums[minIdx], nums[i]
    return nums

def countingSort(nums, max):
    count = [0 for _ in range(max)]
    for n in nums:
        count[n] += 1
    for i in range(1, max):
        count[i] += count[i-1]
    res = [0] * len(nums)
    for n in nums:
        res[count[n]-1] = n
        count[n] -= 1
    return res


lst = [2,8,5,3,9,4,1]
print(bubbleSort(lst))
print(insertionSort(lst))
print(selectionSort(lst))
print(countingSort(lst, 310))
# [2,8,5,3,9,4,1]
# [2, 5, 3, 8, 4, 1, 9]
# [2, 3, 5, 4, 1, 8, 9]


