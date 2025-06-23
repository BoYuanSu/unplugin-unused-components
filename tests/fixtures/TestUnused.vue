<script>
import { defineComponent, h } from 'vue'
export default defineComponent({
  setup() {
    return () => h('div', [
      h('h1', 'Test Component'),
      h('p', 'This is a test component.')
    ])
  }
});
</script>