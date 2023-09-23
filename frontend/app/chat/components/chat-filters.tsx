'use client'

import { Toggle } from '@/components/ui/toggle'
import { Filter, filters as filtersPreset } from '../data/presets'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type Props = {
  filters: Filter[]
}

export default function ChatFilters({ filters }: Props) {
  const queryClient = useQueryClient()
  const addFilters = useMutation({
    mutationFn: (variables: { pressed: boolean; filterObj: Filter }) => {
      return Promise.resolve(
        handleSelect(variables.pressed, variables.filterObj)
      )
    },
    onSuccess: data => {
      queryClient.setQueryData(['filters'], data)
    }
  })

  const handleSelect = (isPressed: boolean, filter: Filter) => {
    if (isPressed) return [...filters, filter]
    if (!isPressed) return filters.filter(el => el.id !== filter.id)
  }

  return (
    <div className="relative mx-auto mb-8 w-fit max-w-2xl space-x-2 px-4">
      {filtersPreset.map(filter => (
        <Toggle
          key={filter.id}
          onPressedChange={isPressed =>
            addFilters.mutate({ filterObj: filter, pressed: isPressed })
          }
        >
          {filter.name}
        </Toggle>
      ))}
    </div>
  )
}
