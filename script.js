function calculateDamage() {
    const baseSpeed = parseInt(document.getElementById('baseSpeed').value) || 75;
    const conMod = parseInt(document.getElementById('conMod').value) || 6;
    const allocatedSpeed = parseInt(document.getElementById('allocatedSpeed').value) || 0;
    
    // Start with base speed
    let totalSpeed = baseSpeed;
    
    // Check if any dash is used
    const isDashing = document.getElementById('dash1').checked || document.getElementById('dash2').checked;
    
    // Apply multipliers
    if (document.getElementById('dash1').checked) totalSpeed *= 2;
    if (document.getElementById('dash2').checked) totalSpeed *= 2;
    if (document.getElementById('feline').checked) totalSpeed *= 2;
    if (document.getElementById('boots').checked) totalSpeed *= 2;
    if (isDashing) totalSpeed *= 2; // Fast pace auto-activates when dashing
    
    // Subtract allocated speed for hit and run
    const attackSpeed = Math.max(0, totalSpeed - allocatedSpeed);
    const remainingSpeed = totalSpeed - attackSpeed;
    
    // Calculate damage: (Attack Speed / 30) * Constitution Modifier
    const speedRatio = attackSpeed / 30;
    const damage = Math.floor(speedRatio * conMod);
    
    // Update display
    document.getElementById('totalSpeed').textContent = `${totalSpeed} (${attackSpeed} attack, ${remainingSpeed} spare)`;
    document.getElementById('damage').textContent = damage;
    document.getElementById('formula').textContent = 
        `Formula: (${attackSpeed} ÷ 30) × ${conMod} = ${speedRatio.toFixed(2)} × ${conMod} = ${damage}`;
}

// Add event listeners to checkboxes
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = ['dash1', 'dash2', 'feline', 'boots'];
    document.getElementById('allocatedSpeed').addEventListener('input', calculateDamage);
    checkboxes.forEach(id => {
        document.getElementById(id).addEventListener('change', calculateDamage);
    });
    
    // Calculate on page load
    calculateDamage();
});